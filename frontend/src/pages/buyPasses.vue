<template>
    <div class="container mx-auto p-[10px] bg-[#D3D3E0]">
        <div class="text-center p-[5px] text-2xl tracking-[2px] w-max mx-auto border-b-[2px] border-black">
            Buy NFTs here!
        </div>

        <!-- You should be login else go home screen -->
        <div v-if="!login">
            You need to login firt
        </div>



        <!-- listing 3 NFTs -->
        <div v-else class="flex justify-around flex-wrap text-center p-[20px]">
            <!-- 1. BASIC -->
            <div v-if= "userInfo.status == 'FREE'" class="w-[150px]">
                <div>
                    BASIC
                </div>

                <div v-if="!infoLoaded">
                    <!-- <div>{{ NFTPrice.BASIC.Link }}</div> -->
                    <img :src="NFTPrice.BASIC.Link " class="h-[100px] mx-auto rounded-[10px] border border-black m-[10px]">
                    <div>{{ NFTPrice.BASIC.Price }} ETH</div>
                    <div class="w-full">
                        <div @click="buyPass(NFTPrice.BASIC.Price, 1)" v-if='!loading && login'
                            class="p-[5px] m-[5px] bg-[#ffad39] hover:bg-[#c28b3e] rounded-[30px] grid place-content-center cursor-pointer">
                            Buy Basic</div>
                        <div v-if='loading'
                            class="mt-[10px] mb-[10px] h-[50px] bg-[#ffad39] rounded-[30px] grid place-content-center cursor-progress">
                            <div v-if='loading' class="flex"><img src="../assets/Icons/loaging.png" alt=""
                                    class="motion-reduce:hidden animate-spin dark:invert">&nbsp;&nbsp;Loading...</div>
                        </div>
                    </div>
                </div>
                <div v-else class="h-[50px] flex justify-center">
                    <img src="../assets/Icons/loaging.png" alt="" class="motion-reduce:hidden animate-spin">
                </div>
            </div>

            <!-- 2. SILVER -->
            <div v-if= "userInfo.status == 'FREE' || userInfo.status == 'BASIC'" class="w-[150px]">
                <div>
                    SILVER
                </div>

                <div v-if="!infoLoaded">
                    <!-- <div>{{ NFTPrice.SILVER.Link }}</div> -->
                    <img :src="NFTPrice.SILVER.Link " class="h-[100px] mx-auto rounded-[10px] border border-black m-[10px]">
                    <div>{{ NFTPrice.SILVER.Price }} ETH</div>
                    <div class="w-full">
                        <div @click="buyPass(NFTPrice.SILVER.Price, 2)" v-if='!loading && login'
                            class="p-[5px] m-[5px] bg-[#ffad39] hover:bg-[#c28b3e] rounded-[30px] grid place-content-center cursor-pointer">
                            Buy Silver</div>
                        <div v-if='loading'
                            class="mt-[10px] mb-[10px] h-[50px] bg-[#ffad39] rounded-[30px] grid place-content-center cursor-progress">
                            <div v-if='loading' class="flex"><img src="../assets/Icons/loaging.png" alt=""
                                    class="motion-reduce:hidden animate-spin dark:invert">&nbsp;&nbsp;Buying...</div>
                        </div>
                    </div>
                </div>
                <div v-else class="h-[50px] flex justify-center">
                    <img src="../assets/Icons/loaging.png" alt="" class="motion-reduce:hidden animate-spin">
                </div>
            </div>

            <!-- 3. GOLDEN -->
            <div v-if= "userInfo.status == 'FREE' || userInfo.status == 'BASIC' || userInfo.status == 'SILVER'" class="w-[150px]">
                <div>
                    GOLDEN
                </div>

                <div v-if="!infoLoaded">
                    <!-- <div>{{ NFTPrice.GOLDEN.Link }}</div> -->
                    <img :src="NFTPrice.GOLDEN.Link " class="h-[100px] mx-auto rounded-[10px] border border-black m-[10px]">
                    <div>{{ NFTPrice.GOLDEN.Price }} ETH</div>
                    <div class="w-full">
                        <div @click="buyPass(NFTPrice.GOLDEN.Price, 3)" v-if='!loading && login'
                            class="p-[5px] m-[5px] bg-[#ffad39] hover:bg-[#c28b3e] rounded-[30px] grid place-content-center cursor-pointer">
                            Buy Golden</div>
                        <div v-if='loading'
                            class="mt-[10px] mb-[10px] h-[50px] bg-[#ffad39] rounded-[30px] grid place-content-center cursor-progress">
                            <div v-if='loading' class="flex"><img src="../assets/Icons/loaging.png" alt=""
                                    class="motion-reduce:hidden animate-spin dark:invert">&nbsp;&nbsp;Loading...</div>
                        </div>
                    </div>
                </div>
                <div v-else class="h-[50px] flex justify-center">
                    <img src="../assets/Icons/loaging.png" alt="" class="motion-reduce:hidden animate-spin">
                </div>
            </div>

            <div v-else>
                Awesome! You have highest access!
            </div>
        </div>


        <!-- Show only the upgradable options -->
        <div class="flex justify-center">
            <router-link to="/">
                <button class="border p-[8px] rounded-[10px] text-[20px] bg-[#fffff4]">Main Page</button>
            </router-link>
        </div>
    </div>
</template>

<script>
import {
    mapActions,
    mapState
} from 'pinia'

import {
    useUser
} from '../stores/user'

import {
    useInfo
} from '../stores/info'


export default {
    name: 'buyPasses',
    components: {

    },
    beforeMount() {
        // get NFT info
        this.getNFTPrices()
    },
    computed: {
        ...mapState(useUser, ['wallet','login','loading']),
        ...mapState(useInfo, ['infoLoaded', 'NFTPrice','userInfo'])
    },
    methods: {
        ...mapActions(useInfo, ['getNFTPrices', 'buyPass']),
    },

}
</script>

<style>
div {
    /* border: 1px solid; */
}
</style>