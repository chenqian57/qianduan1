package com.shang.serviceImpl;
/**
 * 商品分类接口实现类
 */
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shang.mapper.ProductCategoryDao;
import com.shang.entity.ProductCategory;
import com.shang.service.ProductCategoryService;
@Service
public class ProductCategoryServiceImpl implements ProductCategoryService {

	@Autowired
	private ProductCategoryDao productCategoryDao;
	
	@Override
	public int add(ProductCategory productCategory) {
		// TODO Auto-generated method stub
		return productCategoryDao.add(productCategory);
	}

	@Override
	public int edit(ProductCategory productCategory) {
		// TODO Auto-generated method stub
		return productCategoryDao.edit(productCategory);
	}

	@Override
	public int delete(Long id) {
		// TODO Auto-generated method stub
		return productCategoryDao.delete(id);
	}

	@Override
	public List<ProductCategory> findList(Map<String, Object> queMap) {
		// TODO Auto-generated method stub
		return productCategoryDao.findList(queMap);
	}

	@Override
	public Integer getTotal(Map<String, Object> queryMap) {
		// TODO Auto-generated method stub
		return productCategoryDao.getTotal(queryMap);
	}

	@Override
	public ProductCategory findById(Long id) {
		// TODO Auto-generated method stub
		return productCategoryDao.findById(id);
	}

}
