export default function classDataFromState(state){
    return {
        title: state.title,
        description: state.description,
        duration: state.duration,
        costPerDevice: state.costPerDevice,
        mealKitCost: state.mealKitCost,
        hasMealKit: state.hasMealKit,
        thumbnail: state.thumbnail,
    }
}