<template>
    <div class="text-center text-xl">
        <b>Wallet:</b> {{ wallet }}<br>
        <b><u>AccessInfo</u></b><br>
        <b>NFT ID:</b> {{ userInfo.nftId }} <br>
       <b>Status:</b> {{ userInfo.status }}
        <span v-if="userInfo.status != 'GOLDEN'">
            <router-link to="/buyNFT">
                <button class="border p-[5px] rounded-[10px] bg-[#ffad39] hover:bg-[#c28b3e]">Upgrade!</button>
            </router-link>
        </span><br>
        <!-- <b>NFT Link:</b> {{ userInfo.nftLink }} <br> -->
        <img :src="userInfo.nftLink " class="h-[100px] mx-auto rounded-[10px] border border-black m-[10px]">
        

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
        ...mapState(useUser, ['wallet']),
        ...mapState(useInfo, ['userInfo']),
    },
}
</script>