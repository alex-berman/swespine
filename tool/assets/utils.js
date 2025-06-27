export function isMonotonic(array) {
    if (array.length < 2) return true;
    let increasing = true;
    let decreasing = true;
    for (let i = 1; i < array.length; i++) {
        if (array[i] > array[i - 1]) {
            decreasing = false;
        } else if (array[i] < array[i - 1]) {
            increasing = false;
        }
    }
    return increasing || decreasing;
}

