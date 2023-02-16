package com.brandnew.saw.web.manage;

import com.brandnew.saw.exception.BadRequestException;
import com.brandnew.saw.service.EatService;
import com.brandnew.saw.service.FoodService;
import com.brandnew.saw.web.dto.manage.EatRequestDto;
import com.brandnew.saw.web.dto.manage.FoodRequestDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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

    @PutMapping("save")
    public ResponseEntity<Object> upsert(@Valid @RequestBody FoodRequestDto foodDto,  BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> result = new HashMap<>();
            for ( var error :bindingResult.getFieldErrors()){
                result.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(result,HttpStatus.BAD_REQUEST);
        }

        foodService.upsert(foodDto);

        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @DeleteMapping("delete")
    public ResponseEntity<Map<String, Object>> deleteFood(@RequestParam String foodName, long uid) {
        foodService.delete(foodName, uid);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("search")
    public ResponseEntity<String> deleteFood(@RequestParam String foodName) {
        System.out.println("foodName : "+ foodName);

        return new ResponseEntity<>(foodService.searchFoodWithJsoup(foodName), HttpStatus.OK);
    }

}
