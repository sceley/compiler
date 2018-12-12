# 编译器

## 词法分析器

测试句子:

- begin x:=9; if x>9 then x:=2*x+1/3; end #
- begin x:=9a; if x><9 then x<>2*x+1/3;, end #

## 语法分析器

测试句子:
    
- i+i*i$
- i++i**i$
- (i+i*i)+i$
- i+i*i+$

## 语义分析器

测试句子:

- d1 : real ; id2 :↑integer; id3:integer

语法分析树

![语法分析树](syntax-analysis-tree.png)