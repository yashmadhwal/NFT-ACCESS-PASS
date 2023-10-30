const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT ACCESS PASS TESTING", function () {
    let owner, user;
    let nftpass;
    
    before(async () => {
      [owner, ...user] = await ethers.getSigners();
      nftpass = await ethers.deployContract('NFTACCESSPASS');
    });
  
    it("Checking the contract is correctly deployed.", async function () {
        expect(await nftpass.owner()).to.equal(owner.address);
        expect(await nftpass.name()).to.equal("NFT Access Control");
        expect(await nftpass.symbol()).to.equal("NFTAC");
    });

    
    it("User 0 is minting NFT pass: Basic and checking owner balance.", async function(){
        const initialOwnerBalance = await ethers.provider.getBalance(owner.address);
        const accessLevel = 1;
        const price = await nftpass.accessPrices(accessLevel);
        await nftpass.connect(user[0]).getPASS(user[0].address,accessLevel, { value: price });
        const finalOwnerBalance = await ethers.provider.getBalance(owner.address);
        const expectedOwnerBalance = initialOwnerBalance + price;
        expect(finalOwnerBalance).to.equal(expectedOwnerBalance);
    });

    it('User 0 cannot mint an NFT pass for user 1, but only User 1: Basic Pass.', async function(){
        const accessLevel = 1;
        const price = await nftpass.accessPrices(accessLevel);
        await expect(nftpass.connect(user[0]).getPASS(user[1].address,accessLevel, { value: price })).to.revertedWith("Sender should be the Recipient")
        await nftpass.connect(user[1]).getPASS(user[1].address,accessLevel, { value: price })
    });

    it('User 0 wants to upgrade: Silver Pass and check the owner balance.', async function(){
        const initialOwnerBalance = await ethers.provider.getBalance(owner.address);
        const accessLevel = 2;
        const price = await nftpass.accessPrices(accessLevel);
        await nftpass.connect(user[0]).getPASS(user[0].address,accessLevel, { value: price });
        info = await nftpass.getUserInfo(user[0]);
        expect(Number(info[0])).to.equal(3);
        expect(Number(info[1])).to.equal(accessLevel);
        expect(info[2]).to.equal('Link to SILVER');
        const finalOwnerBalance = await ethers.provider.getBalance(owner.address);
        const expectedOwnerBalance = initialOwnerBalance + price;
        expect(finalOwnerBalance).to.equal(expectedOwnerBalance);

    });

    it('User 1 wants to upgrade: Golden Pass and check the owner balance.', async function(){
        const initialOwnerBalance = await ethers.provider.getBalance(owner.address);
        const accessLevel = 3;
        const price = await nftpass.accessPrices(accessLevel);
        await nftpass.connect(user[1]).getPASS(user[1].address,accessLevel, { value: price });
        info = await nftpass.getUserInfo(user[1]);
        expect(Number(info[1])).to.equal(accessLevel);
        const finalOwnerBalance = await ethers.provider.getBalance(owner.address);
        const expectedOwnerBalance = initialOwnerBalance + price;
        expect(finalOwnerBalance).to.equal(expectedOwnerBalance);
    });

    it('The Owner sees that the sales are going well, so the decides to increase the price by 0.2 ethers each (Only the owner can do this).', async function(){
        const inflationPrice = BigInt(200000000000000000) //0.2 ethers
        // console.log('inflationPrice',inflationPrice)
        levelBasic = 1
        levelSilver = 2
        levelGolden = 3
        priceBasic = await nftpass.accessPrices(levelBasic);
        priceSilver = await nftpass.accessPrices(levelSilver);
        priceGolden = await nftpass.accessPrices(levelGolden);
        await expect(nftpass.connect(user[5]).setAccessPrice(levelBasic,priceBasic + inflationPrice)).to.rejectedWith('Ownable: caller is not the owner')
        await nftpass.connect(owner).setAccessPrice(levelBasic,priceBasic + inflationPrice);
        await nftpass.connect(owner).setAccessPrice(levelSilver,priceSilver + inflationPrice);
        await nftpass.connect(owner).setAccessPrice(levelGolden,priceGolden + inflationPrice);
        expect(await nftpass.accessPrices(levelBasic)).to.equal(priceBasic + inflationPrice);
        expect(await nftpass.accessPrices(levelSilver)).to.equal(priceSilver + inflationPrice);
        expect(await nftpass.accessPrices(levelGolden)).to.equal(priceGolden + inflationPrice);   
    });
   
    it('User 2 wants to upgrade: Golden Pass and check the owner balance (should be updated price).', async function(){
        const initialOwnerBalance = await ethers.provider.getBalance(owner.address);
        const accessLevel = 3;
        const price = await nftpass.accessPrices(accessLevel);
        await nftpass.connect(user[2]).getPASS(user[2].address,accessLevel, { value: price });
        info = await nftpass.getUserInfo(user[2]);
        expect(Number(info[1])).to.equal(accessLevel);
        const finalOwnerBalance = await ethers.provider.getBalance(owner.address);
        const expectedOwnerBalance = initialOwnerBalance + price;
        expect(finalOwnerBalance - initialOwnerBalance).to.equal(price);
        expect(finalOwnerBalance).to.equal(expectedOwnerBalance);
    });

    it("The Owner wants to update the URL Link (Only the owner can do this), and the user's URL is also updated.", async function(){

        levelBasic = 1
        levelSilver = 2
        levelGolden = 3
        urlBasic = await nftpass.tokenURIs(levelBasic);
        expect(urlBasic).to.equal("Link to BASIC");
        urlSilver = await nftpass.tokenURIs(levelSilver);
        expect(urlSilver).to.equal("Link to SILVER");
        urlGolden = await nftpass.tokenURIs(levelGolden);
        expect(urlGolden).to.equal("Link to GOLDEN");

        info = await nftpass.getUserInfo(user[1]);
        expect(info[2]).to.equal('Link to GOLDEN');


        await expect(nftpass.connect(user[5]).setTokenURI(levelBasic,"NEW: Link to BASIC")).to.rejectedWith('Ownable: caller is not the owner')
        await nftpass.connect(owner).setTokenURI(levelBasic,"NEW: Link to BASIC");
        await nftpass.connect(owner).setTokenURI(levelSilver,"NEW: Link to SILVER");
        await nftpass.connect(owner).setTokenURI(levelGolden,"NEW: Link to GOLDEN");

        expect(await nftpass.tokenURIs(levelBasic)).to.equal("NEW: Link to BASIC");
        expect(await nftpass.tokenURIs(levelSilver)).to.equal("NEW: Link to SILVER");
        expect(await nftpass.tokenURIs(levelGolden)).to.equal("NEW: Link to GOLDEN");
        
        info = await nftpass.getUserInfo(user[1]);
        expect(info[2]).to.equal('NEW: Link to GOLDEN');
    });
});