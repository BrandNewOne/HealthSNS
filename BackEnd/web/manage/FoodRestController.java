package com.brandnew.saw.web.manage;

import com.brandnew.saw.exception.BadRequestException;
import com.brandnew.saw.service.EatService;
import com.brandnew.saw.service.FoodService;
import com.brandnew.saw.web.dto.manage.EatRequestDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@RestController
@RequestMapping("/food")
public class FoodRestController {

    private final FoodService foodService;


    @GetMapping("myFood")
    public ResponseEntity<Map<String, Object>> myFood(EatRequestDto eatDto) {
        return new ResponseEntity<>(foodService.findMyFood(eatDto), HttpStatus.OK);
    }

    @DeleteMapping("delete")
    public ResponseEntity<Map<String, Object>> deleteFood(@RequestParam String foodName, long uid) {
        System.out.println("delete foodName : "+ foodName);
        foodService.delete(foodName, uid);

        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
