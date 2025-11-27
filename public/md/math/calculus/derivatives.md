# 导数 (Derivatives)

导数描述了函数的变化率。

## 定义

$$ f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} $$

## 常见导数表

| 函数 $f(x)$ | 导数 $f'(x)$ |
| :--- | :--- |
| $C$ | $0$ |
| $x^n$ | $nx^{n-1}$ |
| $\sin x$ | $\cos x$ |
| $e^x$ | $e^x$ |
| $\ln x$ | $\frac{1}{x}$ |

## 链式法则 (Chain Rule)

若 $y = f(u)$ 且 $u = g(x)$，则：

$$ \frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx} $$