package com.brandnew.saw.web.manage;

import com.brandnew.saw.exception.BadRequestException;
import com.brandnew.saw.service.EatService;
import com.brandnew.saw.web.dto.manage.EatRequestDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@RestController
@RequestMapping("/eat")
public class EatRestController {

    private final EatService eatService;

    @GetMapping("main")
    public ResponseEntity<Map<String, Object>> main(EatRequestDto eatDto) {
        return new ResponseEntity<>(eatService.findEatDatasDesc(eatDto), HttpStatus.OK);
    }


    @GetMapping("myFood")
    public ResponseEntity<Map<String, Object>> myFood(EatRequestDto eatDto) {
        return new ResponseEntity<>(eatService.findMyFood(eatDto), HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<Map<String, Object>> saveEat(@Valid @RequestBody EatRequestDto eatDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> list = bindingResult.getFieldErrors().stream()
                    .map(FieldError::getDefaultMessage).collect(Collectors.toList());

            throw new BadRequestException(list.toString());
        }

        eatService.save(eatDto);

        return new ResponseEntity<>(null, HttpStatus.OK);
    }

//    @PutMapping("update/{id}")
//    public ResponseEntity<Map<String, Object>> updateEat(@PathVariable Long id, @RequestBody PostsUpdateRequestDto requestDto) {
//        manageService.update(id, requestDto);
//
//        System.out.println(id + "들어옴");
//
//        return new ResponseEntity<>(manageService.findById(id), HttpStatus.OK);
//    }

    @GetMapping("update/{id}")
    public ResponseEntity<Map<String, Object>> updateEat(@PathVariable Long id) {
        return new ResponseEntity<>(eatService.findById(id), HttpStatus.OK);
    }

    @DeleteMapping("delete")
    public ResponseEntity<Map<String, Object>> deleteEat(@RequestParam Long id) {
        System.out.println("delete id : "+id);
        eatService.delete(id);

        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
