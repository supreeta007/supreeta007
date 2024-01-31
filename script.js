document.addEventListener("DOMContentLoaded", function () {
    createBars();
});

let bars = [];

function createBars() {
    const chartContainer = document.getElementById("chartContainer");
    chartContainer.innerHTML = "";

    for (let i = 0; i < 20; i++) {
        const height = Math.floor(Math.random() * 200) + 50;
        bars.push(height);

        const barContainer = document.createElement("div");
        barContainer.className = "bar-container";

        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = height + "px";

        const barValue = document.createElement("div");
        barValue.className = "bar-value";
        barValue.textContent = height;

        barContainer.appendChild(bar);
        barContainer.appendChild(barValue);
        chartContainer.appendChild(barContainer);
    }
}

function randomizeBars() {
    bars = [];
    createBars();
}

function bubbleSort() {
    for (let i = 0; i < bars.length - 1; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {
            if (bars[j] > bars[j + 1]) {
                // Swap bars[j] and bars[j + 1]
                const temp = bars[j];
                bars[j] = bars[j + 1];
                bars[j + 1] = temp;

                // Update visual representation
                updateBarHeight(j, bars[j]);
                updateBarHeight(j + 1, bars[j + 1]);
            }
        }
    }
}

function selectionSort(){
    for(let i=0;i<bars.length-1;i++){
        let minp=i;
        for(let j=i+1;j<bars.length;j++){
            if(bars[j]<bars[minp]){
               minp=j;
            }
        }
        //swap
        let temp=bars[minp];
        bars[minp]=bars[i];
        bars[i]=temp;

        // Update visual representation
        updateBarHeight(minp,bars[minp]);
        updateBarHeight(i, bars[i]);
    }
}

function insertionSort(){
    for(let i=1;i<bars.length;i++){
        let curr=bars[i];
        let prev=i-1;

        //finding out correct pos to insert
        while(prev>=0 && bars[prev]>curr){
            bars[prev+1]=bars[prev];

            // Update visual representation during the sorting process
            updateBarHeight(prev + 1, bars[prev]);
            prev--;
        }

        //insertion
        bars[prev+1]=curr;

        // Update visual representation after insertion
        updateBarHeight(prev + 1, curr);

    }
}

//Quick Sort
function quickSort() {
    quickSortRecursive(0, bars.length - 1);
}

function quickSortRecursive(low, high) {
    if (low < high) {
        const partitionIndex = partition(low, high);

        // Recursively sort the elements before and after the partition
        quickSortRecursive(low, partitionIndex - 1);
        quickSortRecursive(partitionIndex + 1, high);
    }
}

function partition(low, high) {
    const pivot = bars[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (bars[j] < pivot) {
            i++;
            // Swap bars[i] and bars[j]
            const temp = bars[i];
            bars[i] = bars[j];
            bars[j] = temp;

            // Update visual representation during the sorting process
            updateBarHeight(i, bars[i]);
            updateBarHeight(j, bars[j]);
        }
    }

    // Swap bars[i + 1] and bars[high]
    const temp = bars[i + 1];
    bars[i + 1] = bars[high];
    bars[high] = temp;

    // Update visual representation after the partition
    updateBarHeight(i + 1, bars[i + 1]);
    updateBarHeight(high, bars[high]);

    return i + 1;
}

// Merge Sort
function mergeSort() {
    bars = mergeSortRecursive(bars);
    updateBarsVisual(bars);
}

function mergeSortRecursive(arr) {
    const length = arr.length;
    if (length <= 1) {
        return arr;
    }

    const mid = Math.floor(length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return merge(mergeSortRecursive(left), mergeSortRecursive(right));
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // Concatenate the remaining elements
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function updateBarsVisual(sortedBars) {
    for (let i = 0; i < sortedBars.length; i++) {
        setTimeout(() => {
            bars[i] = sortedBars[i];
            updateBarHeight(i, sortedBars[i]);
        }, i * 100); // Adjust the timeout value for a smoother animation
    }
}


// Shell Sort
function shellSort() {
    const length = bars.length;
    let gap = Math.floor(length / 2);

    while (gap > 0) {
        for (let i = gap; i < length; i++) {
            const temp = bars[i];
            let j = i;

            while (j >= gap && bars[j - gap] > temp) {
                bars[j] = bars[j - gap];

                // Update visual representation during the sorting process
                updateBarHeight(j, bars[j]);

                j -= gap;
            }

            bars[j] = temp;

            // Update visual representation after each iteration
            updateBarHeight(j, bars[j]);
        }

        gap = Math.floor(gap / 2);
    }
}

// Function to change the size of the bars
function changeBarSize() {
    const newSize = Math.floor(Math.random() * 10) + 20; // Random size between 20 and 120
    updateBarsSize(newSize);
}

// Function to update the size of the bars
function updateBarsSize(newSize) {
    const chartContainer = document.getElementById("chartContainer");
    chartContainer.innerHTML = "";
    bars = [];

    for (let i = 0; i < newSize; i++) {
        const height = Math.floor(Math.random() * 200) + 50;
        bars.push(height);

        const barContainer = document.createElement("div");
        barContainer.className = "bar-container";

        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = height + "px";

        const barValue = document.createElement("div");
        barValue.className = "bar-value";
        barValue.textContent = height;

        barContainer.appendChild(bar);
        barContainer.appendChild(barValue);
        chartContainer.appendChild(barContainer);
    }
}


function updateBarHeight(index, height) {
    const barsElements = document.getElementsByClassName("bar");
    barsElements[index].style.height = height + "px";
    barsElements[index].nextElementSibling.textContent = height;
}