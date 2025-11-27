# 矩阵基础 (Matrix Basics)

## 矩阵定义

矩阵是一个按照长方阵列排列的复数或实数集合。

$$ A = \begin{pmatrix} a & b \\ c & d \end{pmatrix} $$

## 行列式 (Determinant)

对于 $2 \times 2$ 矩阵，其行列式为：

$$ \text{det}(A) = ad - bc $$

## 特征值与特征向量

如果存在非零向量 $v$ 和标量 $\lambda$，使得：

$$ Av = \lambda v $$

则称 $\lambda$ 为特征值，$v$ 为对应的特征向量。

求解特征值的方法是解特征方程：

$$ \text{det}(A - \lambda I) = 0 $$