package com.sellerhelper.repository;

import com.sellerhelper.entity.ProductEntity;
import org.springframework.data.repository.CrudRepository;
public interface ProductRepository extends CrudRepository<ProductEntity, String>{
}
