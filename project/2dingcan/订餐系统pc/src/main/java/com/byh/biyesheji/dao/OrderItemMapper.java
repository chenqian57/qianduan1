package com.byh.biyesheji.dao;

import com.byh.biyesheji.pojo.OrderItem;
import com.byh.biyesheji.pojo.OrderItemExample;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface OrderItemMapper extends CrudDao<OrderItem>{

    List<OrderItem> selectByExample(OrderItemExample example);

    int saveList(@Param("orderItemList") List<OrderItem> orderItemList);

}