import {defineStore} from "pinia";
import {computed, ref} from "vue";

export const useNavigation = defineStore("navigation", () => {
    const module = ref("");
    const functionalityGroup = ref("")
    const functionality = ref("");
    const navigationVisible = ref(false);
    const functionalitySelected = computed(() => module.value !== "");

    function toggleNavigationVisible() {
        navigationVisible.value = !navigationVisible.value;
    }

    function selectFunctionality(newModule: string, newFunctionalityGroup: string, newFunctionality: string) {
        module.value = newModule;
        functionalityGroup.value = newFunctionalityGroup;
        functionality.value = newFunctionality;
    }

    return {
        module,
        functionalityGroup,
        functionality,
        navigationVisible,
        functionalitySelected,
        toggleNavigationVisible,
        selectFunctionality
    };
})