<template>
    <div class="container mx-auto bg-[#D3D3E0]">
        <div class="p-[20px] flex flex-col justify-between">

            <!-- Heading -->
            <div class="text-[30px] mx-auto p-[10px] text-center pb-[1px]">
                NFT-based Access
            </div>

            <!-- Conect Wallet -->
            <div class="flex justify-center">
                <ConnectWallet></ConnectWallet>
            </div>

            <!-- User Info -->
            <div v-if="login && !loading">
                <userInfo></userInfo>
                <!-- Free -->
                <div v-if="userInfo.status == 'FREE'" class="border border-black border-[2px] rounded-[25px]">
                    <Free></Free>
                </div>

                <!-- Basic -->
                <div v-if="userInfo.status == 'BASIC'" class="border border-black border-[2px] rounded-[25px]">
                    <Basic></Basic>
                 </div>

                <!-- Silver -->
                <div v-if="userInfo.status == 'SILVER'" class="border border-black border-[2px] rounded-[25px]">
                    <Silver></Silver>
                </div>

                <!-- Golden -->
                <div v-if="userInfo.status == 'GOLDEN'" class="border border-black border-[2px] rounded-[25px]">
                    <Golden></Golden>
                </div>
            </div>

            <div v-else class="text-center m-[20px]">
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