package com.byh.biyesheji.service;

public class KnapsackProblemDemo {

    public static void main(String[] args) {
        //物品的重量
        int[] weight = {88,56,10,86,15};
        //物品的价格
        int[] price = {88,56,10,86,15};
        //背包的容量
        int capacity = 200;

        KnapsackProblem knapsackProblem = new KnapsackProblem(weight,price,capacity);

        //显示最佳装配的商品下标
        knapsackProblem.showProduct();
    }
}

class KnapsackProblem{
    //物品的重量
    int[] weight = {1, 4, 3};
    //物品的价格
    int[] price = {1500, 3000, 2000};
    //背包的容量
    int capacity = 4;
    //物品的个数
    int number;
    //创建二维数组
    //dataArray[i][j] 表示在前i个物品中能够装入容量为j的背包中的最大价值
    int[][] dataArray;
    //记录放入的商品情况
    int[][] product;

    public KnapsackProblem(int[] weight, int[] price, int capacity) {
        if(weight.length != price.length){
            System.out.println("物品重量与价值数量不匹配！");
            return;
        }
        this.weight = weight;
        this.price = price;
        this.capacity = capacity;
        this.number = weight.length;
        this.dataArray =  new int[number + 1][capacity + 1];
        this.product =  new int[number + 1][capacity + 1];


        init();
        run();
    }

    /**
     * 输出数据表
     */
    public void showDataTable(){
        //输出看看dataArray
        for (int i = 0; i < dataArray.length; i++) {
            for (int j = 0; j < dataArray[i].length; j++) {
                System.out.print(dataArray[i][j] + "\t");
            }
            System.out.println();
        }
    }

    /**
     * 初始化状态
     */
    private void init(){
        //初始化第一行和第一列,不赋默认值则为0
        //将第一列设置为0
        for (int i = 0; i < dataArray.length; i++) {

            dataArray[i][0] = 0;
        }
        //第一行设为0
        for (int i = 0; i < dataArray[0].length; i++) {
            dataArray[0][i] = 0;
        }
    }

    /**
     * 进行处理
     */
    private void run(){
        //从1开始是为了跳过第一行和第一列
        for (int i = 1; i < dataArray.length; i++) {
            for (int j = 1; j < dataArray[0].length; j++) {
                //
                if (weight[i - 1] > j) {
                    dataArray[i][j] = dataArray[i - 1][j];
                } else {
                    if (dataArray[i - 1][j] < price[i - 1] + dataArray[i - 1][j - weight[i - 1]]) {
                        dataArray[i][j] = price[i - 1] + dataArray[i - 1][j - weight[i - 1]];
                        //将当前物品情况记录到path
                        product[i][j] = 1;
                    } else {
                        dataArray[i][j] = dataArray[i - 1][j];
                    }
                }
            }
        }
    }

    public void showProduct(){
        //行的最大下标
        int rowMax = product.length - 1;
        //列的最大下标
        int colMax = product[0].length - 1;

        while (rowMax > 0 && colMax > 0) {
            if (product[rowMax][colMax] == 1) {
                System.out.printf("第 %d 个商品\n", rowMax);
                colMax -= weight[rowMax - 1];
            }
            rowMax--;
        }
    }
}
