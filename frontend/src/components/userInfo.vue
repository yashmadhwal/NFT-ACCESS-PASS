<template>
    <div class="text-center text-lg bg-white shadow-lg rounded-xl p-6 border border-[#4A4A8D] max-w-md mx-auto">

        <!-- Wallet Info -->
        <div class="mb-4">
            <b class="text-[#4A4A8D]">Wallet: </b>
            <span class="text-gray-700"> {{shortWallet }}</span>
        </div>

        <!-- Access Info -->
        <div class="border-t border-gray-300 pt-4">
            <b class="text-[#4A4A8D] underline">Access Info</b>
        </div>

        <div class="mt-3">
            <b class="text-[#4A4A8D]">NFT ID: </b> 
            <span class="text-gray-700">{{ userInfo.nftId }}</span>
        </div>

        <div class="mt-2">
            <b class="text-[#4A4A8D]">Status: </b>
            <span 
                :class="{
                    'text-green-500 font-bold': userInfo.status === 'GOLDEN',
                    'text-gray-400 font-bold': userInfo.status === 'SILVER',
                    'text-orange-500 font-bold': userInfo.status === 'BASIC',
                    'text-red-500 font-bold': userInfo.status === 'FREE'
                }"
            >
                {{ userInfo.status }}
            </span>
        </div>

        <!-- Upgrade Button -->
        <div v-if="userInfo.status != 'GOLDEN'" class="mt-4">
            <router-link to="/buyNFT">
                <button
                    class="bg-[#4A4A8D] hover:bg-[#3A3A7D] text-white font-bold py-2 px-5 rounded-full shadow-md transition-all">
                    Upgrade!
                </button>
            </router-link>
        </div>

        <!-- NFT Image -->
        <div class="mt-6" v-if="userInfo.status != 'FREE'">
            <img 
                :src="userInfo.nftLink"
                class="h-[100px] mx-auto rounded-lg border border-gray-300 shadow-sm"
                alt="NFT Image"
            />
        </div>
    </div>
</template>

<script>
import {
    mapState
} from 'pinia'

import {
    useUser
} from '../stores/user'

import {
    useInfo
} from '../stores/info'

export default {
    name: 'userInfo',
    computed: {
        ...mapState(useUser, ['wallet', 'shortWallet']),
        ...mapState(useInfo, ['userInfo']),
    },
}
</script>