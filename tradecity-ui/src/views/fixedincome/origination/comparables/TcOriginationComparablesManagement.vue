<template>
    <tc-ok-cancel-container class="h-full bg-secondary">
        <div class="view-grid h-full w-full p-1">
            <div class="flex items-center justify-between">
                <tc-combo-box placeholder="Rule Set Templates" :items="[]" class="w-96" />
                <div>
                    <tc-button plain>
                        <tc-icon icon="note_add" class="large-icon" />
                        <span>Add Rule Set</span>
                    </tc-button>
                    <tc-button plain>
                        <tc-icon icon="library_add" class="large-icon" />
                        <span>Add Rule Set Template</span>
                    </tc-button>
                </div>
            </div>
            <div class="mt-2">
                <!-- rule set -->
                <div class="ruleset-grid w-full" v-for="i in 3">
                    <div class="bg-dark border-zinc-950 border-l border-t font-bold px-0.5">Rule set name</div>
                    <div class="w-full bg-primary">
                        <div class="rule-grid w-full" v-for="i in 3">
                            <div class="t">
                                <tc-combo-box placeholder="Key" :items="[]" for-table class="w-full" />
                            </div>
                            <div class="t">
                                <tc-combo-box placeholder="Operator" :items="[]" for-table class="w-full" />
                            </div>
                            <div class="t">
                                <tc-string-input model-value="" placeholder="" table-input class="w-full" />
                            </div>
                            <div class="t border-r">
                                <div class="flex items-center gap-3 px-2 justify-between h-full w-full">
                                    <tc-button plain class="m-0">
                                        <tc-icon icon="arrow_upward" class="text-lg" />
                                    </tc-button>
                                    <tc-button plain class="m-0">
                                        <tc-icon icon="arrow_downward" class="text-lg" />
                                    </tc-button>
                                    <tc-button plain class="m-0" dangerous>
                                        <tc-icon icon="delete" class="text-lg" />
                                    </tc-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                Clients
                Add Client
                List Client
            </div>
        </div>
    </tc-ok-cancel-container>
</template>

<script setup lang="ts">
import TcComboBox from "@/components/ui/combobox/TcComboBox.vue";
import TcButton from "@/components/ui/button/TcButton.vue";
import TcIcon from "@/components/ui/icons/TcIcon.vue";
import TcOkCancelContainer from "@/components/ui/common/TcOkCancelContainer.vue";
import TcStringInput from "@/components/ui/input/TcStringInput.vue";
</script>

<style scoped>
.view-grid {
    display: grid;
    grid-template-rows: auto 1fr 1fr;
}

.ruleset-grid {
    display: grid;
    grid-template-columns: 0.2fr 1fr;
}

.rule-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr) auto;
}

.t {
    @apply border-zinc-950 border-l border-t;
}

select {

}
</style>