package com.byh.biyesheji.service.impl;

import com.byh.biyesheji.dao.*;
import com.byh.biyesheji.pojo.*;
import com.byh.biyesheji.service.ZiXunService;
import com.byh.biyesheji.util.RecommendUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ZiXunServiceImpl implements ZiXunService {

    @Autowired
    private ZiXunMapper ziXunMapper;
    @Autowired
    private CustomerMapper customerMapper;
    @Autowired
    private ProductMapper productMapper;
    @Autowired
    private RecommendLogMapper recommendLogMapper;
    @Autowired
    private OrderItemMapper orderItemMapper;

    @Override
    public List<ZiXun> list() {
        ZiXunExample example = new ZiXunExample();
        example.createCriteria().andStatusEqualTo(1);
        List<ZiXun> ziXuns = ziXunMapper.selectByExample(example);
        for (ZiXun z:ziXuns){
            Customer customer =customerMapper.selectByPrimaryKey(z.getCstid());
            z.setCustomer(customer);
        }
        return ziXuns;
    }

    @Override
    public void save(ZiXun entity) {
        ziXunMapper.insert(entity);
    }

    @Override
    public void del(int id) {
        ziXunMapper.deleteByPrimaryKey(id);
    }

    @Override
    public ZiXun get(int id) {
        return ziXunMapper.selectByPrimaryKey(id);
    }

    @Override
    public void shenhe(int zid) {
        ziXunMapper.shenhe(zid);
    }

    @Override
    public List<ZiXun> list1() {
        List<ZiXun> ziXuns = ziXunMapper.selectByExample(null);
        for (ZiXun z:ziXuns){
            Customer customer =customerMapper.selectByPrimaryKey(z.getCstid());
            z.setCustomer(customer);
        }
        return ziXuns;
    }

    @Override
    public void forRecommendAdd(Customer c, int sumPrice, String types) throws UnsupportedEncodingException {
        types = URLDecoder.decode(URLDecoder.decode(types, "UTF-8"),"UTF-8");
        List<String> typeList =new ArrayList<>();
        if(types.indexOf("，")>=0){
            String[] type = types.split("，");
            for(int i=0;i<type.length;i++){
                typeList.add(type[i]);
            }
        }else{
            typeList.add(types);
        }
        //按照销量倒序查询出所有菜
        List<Product> productList=productMapper.selectAllByCidDesc(typeList);
        int[] prices=new int[productList.size()];
        for(int i=0;i<productList.size();i++){
            prices[i]=Integer.valueOf(productList.get(i).getPrice()+"");
        }
        RecommendUtil recommendUtil=new RecommendUtil(prices,prices,sumPrice);
        recommendUtil.showProduct();
        List<Integer> indexList=recommendUtil.getIndexList();
        List<OrderItem> orderItemList=new ArrayList<>();
        OrderItem orderItem=null;
        for(int i=0;i<indexList.size();i++){
            orderItem=new OrderItem();
            orderItem.setPid(productList.get(indexList.get(i)-1).getId());
            orderItem.setCstid(c.getId());
            orderItem.setNumber(1);
            orderItemList.add(orderItem);
        }
        //插入购物车
        if(null!=orderItemList&&orderItemList.size()>0){
            orderItemMapper.saveList(orderItemList);
        }

        //插入订餐日志
        RecommendLog recommendLog=new RecommendLog();
        recommendLog.setCustomerId(c.getId());
        recommendLog.setCustomerName(c.getName());
        recommendLog.setSumPrice(sumPrice);
        recommendLog.setTypes(types);
        recommendLog.setCreateTime(new Date());
        recommendLogMapper.save(recommendLog);
    }

    @Override
    public List<RecommendLog> selectRecommendLogsByCustomerId(Integer id) {
        return recommendLogMapper.selectRecommendLogsByCustomerId(id);
    }

    public static void main(String[] args) throws UnsupportedEncodingException {
        String str="%E5%86%B7%E8%8F%9C%EF%BC%8C%E7%83%AD%E8%8F%9C";
        System.out.println(URLDecoder.decode(str, "UTF-8"));
    }
}
