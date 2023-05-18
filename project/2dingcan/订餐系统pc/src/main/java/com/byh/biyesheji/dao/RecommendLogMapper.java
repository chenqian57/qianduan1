package com.byh.biyesheji.dao;

import com.byh.biyesheji.pojo.RecommendLog;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Author qingyu
 * @Date 2020/6/26.
 * @Description
 */
@Repository
public interface RecommendLogMapper {
    int save(@Param("recommendLog") RecommendLog recommendLog);

    List<RecommendLog> selectRecommendLogsByCustomerId(@Param("id") Integer id);
}
