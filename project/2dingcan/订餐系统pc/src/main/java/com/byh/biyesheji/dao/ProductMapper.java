package com.byh.biyesheji.dao;

import com.byh.biyesheji.pojo.Product;
import com.byh.biyesheji.pojo.ProductExample;
import com.byh.biyesheji.pojo.ProductVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ProductMapper extends CrudDao<Product>{

    List<Product> selectByExample(ProductExample example);

    /**
     * 商品上线
     * @param name
     */
    void enableStatus(String name);

    /**
     * 商品下线
     * @param name
     */
    void stopStatus(String name);

    /**
     * 设置图片保存的位置
     * @param vo
     */
    void setImageUrl(ProductVO vo);

    /**
     * 随机五条商品
     * @return
     */
    List<Product> randFive();

    boolean findProByCid(int cid);

    /**
     * 查询出所有的菜单，按照销量倒序排列
     */
    List<Product> selectAllByCidDesc(@Param("typeList") List<String> typeList);

}