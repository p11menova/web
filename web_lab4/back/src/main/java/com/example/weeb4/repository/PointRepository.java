package com.example.weeb4.repository;

import com.example.weeb4.models.Point;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface PointRepository extends CrudRepository<Point, Long> {
}
