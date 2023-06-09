package com.byh.biyesheji.service;

import com.byh.biyesheji.pojo.Customer;
import com.byh.biyesheji.pojo.RecommendLog;
import com.byh.biyesheji.pojo.ZiXun;

import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * 资讯
 */
public interface ZiXunService extends CrudService<ZiXun> {

    /**
     * 资讯审核通过
     * @param zid
     */
    void shenhe(int zid);

    /**
     * 连带未审核的资讯
     * @return
     */
    List<ZiXun> list1();

    void forRecommendAdd(Customer c ,int sumPrice,String types) throws UnsupportedEncodingException;

    List<RecommendLog> selectRecommendLogsByCustomerId(Integer id);

}
