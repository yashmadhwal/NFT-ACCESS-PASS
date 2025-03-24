<template>
    <div class="container mx-auto p-6 bg-gradient-to-b from-[#E3E3F0] to-[#F5F5FA] min-h-screen rounded-lg shadow-lg">

        <!-- Title -->
        <div class="text-center p-4 text-3xl font-bold text-[#4A4A8D] tracking-wide border-b-2 border-[#4A4A8D] w-max mx-auto">
            Buy NFTs Here!
        </div>

        <!-- Login Prompt -->
        <div v-if="!login" class="text-center text-red-500 font-bold mt-6">
            You need to log in first
        </div>

        <!-- NFT Listing -->
        <div v-else class="flex justify-center flex-wrap gap-8 text-center p-6">

            <!-- 1. BASIC NFT -->
            <div v-if="userInfo.status == 'FREE'" class="w-[200px] bg-white rounded-lg shadow-md p-4 border border-[#4A4A8D]">
                <div class="font-bold text-[#4A4A8D]">BASIC</div>

                <div v-if="!infoLoaded">
                    <img :src="NFTPrice.BASIC.Link" class="h-[120px] mx-auto rounded-lg border border-gray-300 shadow-sm my-3">
                    <div class="text-gray-700">{{ NFTPrice.BASIC.Price }} ETH</div>

                    <div class="w-full">
                        <div 
                            @click="buyPass(NFTPrice.BASIC.Price, 1)" 
                            v-if='!loading && login'
                            class="buy-button bg-[#008080] hover:bg-[#3A3A7D] text-white font-bold py-2 px-4 rounded-full shadow-md cursor-pointer mt-3 transition-all">
                            Buy Basic
                        </div>

                        <div v-if='loading' class="h-[50px] flex items-center justify-center text-gray-500 mt-3">
                            <img src="../assets/Icons/loaging.png" alt="" class="w-5 h-5 animate-spin">
                            &nbsp;&nbsp;Loading...
                        </div>
                    </div>
                </div>
            </div>

            <!-- 2. SILVER NFT -->
            <div v-if="userInfo.status == 'FREE' || userInfo.status == 'BASIC'" 
                class="w-[200px] bg-white rounded-lg shadow-md p-4 border border-[#c0c0c0]">
                <div class="font-bold text-[#4A4A8D]">SILVER</div>

                <div v-if="!infoLoaded">
                    <img :src="NFTPrice.SILVER.Link" class="h-[120px] mx-auto rounded-lg border border-gray-300 shadow-sm my-3">
                    <div class="text-gray-700">{{ NFTPrice.SILVER.Price }} ETH</div>

                    <div class="w-full">
                        <div 
                            @click="buyPass(NFTPrice.SILVER.Price, 2)" 
                            v-if='!loading && login'
                            class="buy-button bg-[#c0c0c0] hover:bg-[#3A3A7D] text-white font-bold py-2 px-4 rounded-full shadow-md cursor-pointer mt-3 transition-all">
                            Buy Silver
                        </div>

                        <div v-if='loading' class="h-[50px] flex items-center justify-center text-gray-500 mt-3">
                            <img src="../assets/Icons/loaging.png" alt="" class="w-5 h-5 animate-spin">
                            &nbsp;&nbsp;Buying...
                        </div>
                    </div>
                </div>
            </div>

            <!-- 3. GOLDEN NFT -->
            <div v-if="userInfo.status == 'FREE' || userInfo.status == 'BASIC' || userInfo.status == 'SILVER'" 
                class="w-[200px] bg-white rounded-lg shadow-md p-4 border border-yellow-400">
                <div class="font-bold text-[#4A4A8D]">GOLDEN</div>

                <div v-if="!infoLoaded">
                    <img :src="NFTPrice.GOLDEN.Link" class="h-[120px] mx-auto rounded-lg border border-gray-300 shadow-sm my-3">
                    <div class="text-gray-700">{{ NFTPrice.GOLDEN.Price }} ETH</div>

                    <div class="w-full">
                        <div 
                            @click="buyPass(NFTPrice.GOLDEN.Price, 3)" 
                            v-if='!loading && login'
                            class="buy-button bg-[#FFD700] hover:bg-[#EAC117] text-black font-bold py-2 px-4 rounded-full shadow-md cursor-pointer mt-3 transition-all">
                            Buy Golden
                        </div>

                        <div v-if='loading' class="h-[50px] flex items-center justify-center text-gray-500 mt-3">
                            <img src="../assets/Icons/loaging.png" alt="" class="w-5 h-5 animate-spin">
                            &nbsp;&nbsp;Loading...
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="text-green-500 font-bold mt-6">
                Awesome! You have the highest access!
            </div>
        </div>

        <!-- Main Page Button -->
        <div class="flex justify-center mt-8">
            <router-link to="/">
                <button class="border border-[#4A4A8D] text-[#4A4A8D] font-bold py-2 px-6 rounded-full hover:bg-[#4A4A8D] hover:text-white transition-all">
                    Main Page
                </button>
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