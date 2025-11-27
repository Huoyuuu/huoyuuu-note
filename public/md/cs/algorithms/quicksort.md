# 快速排序 (Quick Sort)

快速排序是一种高效的分治排序算法。

## 算法思想

1. 从数列中挑出一个元素，称为 "基准" (pivot)。
2. 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面。
3. 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。

## 代码实现 (Python)

```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)
```

## 复杂度分析

* **平均时间复杂度**: $O(n \log n)$
* **最坏时间复杂度**: $O(n^2)$
* **空间复杂度**: $O(\log n)$