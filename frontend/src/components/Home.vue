<template>
    <div class="container mx-auto bg-gradient-to-br from-[#D3D3E0] to-[#E8E8F3] min-h-screen flex items-center justify-center p-6">
        <div class="bg-white shadow-xl rounded-3xl p-8 w-full max-w-3xl">
            
            <!-- Heading -->
            <div class="text-4xl font-bold text-center text-[#4B4B7D] pb-4 border-b border-[#D3D3E0]">
                NFT Based Access
            </div>

            <!-- Connect Wallet -->
            <div class="flex justify-center my-6">
                <ConnectWallet class="bg-[#4B4B7D] text-white py-2 px-6 rounded-3xl shadow-md hover:bg-[#5C5C9E] transition-all"></ConnectWallet>
            </div>

            <!-- User Info -->
            <div v-if="login && !loading" class="space-y-4">
                <userInfo></userInfo>

                <!-- Free Access -->
                <div v-if="userInfo.status == 'FREE'" class="bg-[#E8F0FE] border border-[#4B4B7D] rounded-2xl p-4 shadow-md">
                    <Free></Free>
                </div>

                <!-- Basic Access -->
                <div v-if="userInfo.status == 'BASIC'" class="bg-[#D3E3FC] border border-[#4B4B7D] rounded-2xl p-4 shadow-md">
                    <Basic></Basic>
                </div>

                <!-- Silver Access -->
                <div v-if="userInfo.status == 'SILVER'" class="bg-[#BCC8F5] border border-[#4B4B7D] rounded-2xl p-4 shadow-md">
                    <Silver></Silver>
                </div>

                <!-- Golden Access -->
                <div v-if="userInfo.status == 'GOLDEN'" class="bg-[#FFD700] border border-[#4B4B7D] rounded-2xl p-4 shadow-md">
                    <Golden></Golden>
                </div>
            </div>

            <div v-else class="text-center text-[#4B4B7D] mt-6 text-lg">
                Connect wallet to access content(s)
            </div>
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

import ConnectWallet from './ConnectWallet.vue'
import userInfo from './userInfo.vue'
// Content
import Free from './access/free.vue'
import Basic from './access/basic.vue'
import Silver from './access/silver.vue'
import Golden from './access/golden.vue'


export default {
    name: 'Home',
    components: {
        ConnectWallet,
        userInfo,
        Free,
        Basic,
        Silver,
        Golden
    },
    computed: {
        ...mapState(useUser, ['shortWallet', 'loading', 'login']),
        ...mapState(useInfo, ['Owner','userInfo']),
    },
    methods: {
        ...mapActions(useUser, ['connectMetamask']),
        ...mapActions(useInfo, ['getOwner']),

    },

}
</script>

<style scoped>
/* * {
    border: 1px solid;
} */
</style>