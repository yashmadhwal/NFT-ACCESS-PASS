<template>
    <div class="w-[300px] pl-[5px] pr-[5px] mr-[10px]">
        <div @click="connectMetamask()" v-if='!loading && !login'
            class="mt-[10px] mb-[10px] h-[50px] grid place-content-center cursor-pointer">
            Connect MetaMask</div>
        <div v-if='loading' class="mt-[10px] mb-[10px] h-[50px] grid place-content-center cursor-progress">
            <div v-if='loading' class="flex"><img src="../assets/Icons/loaging.png" alt=""
                    class="motion-reduce:hidden animate-spin dark:invert">&nbsp;&nbsp;Loading...</div>
        </div>
        <div v-if='login && !loading'
            class="mt-[10px] mb-[10px] h-[50px] grid place-content-center cursor-not-allowed">
            Connected!</div>
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
    name: 'Button',
    computed: {
        ...mapState(useUser, ['shortWallet', 'loading', 'login']),
    },
    methods: {
        ...mapActions(useUser, ['connectMetamask']),
        ...mapActions(useInfo, ['getOwner']),
    },

}
</script>