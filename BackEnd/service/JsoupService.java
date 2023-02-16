package com.brandnew.saw.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.HashMap;

@RequiredArgsConstructor
@Service
public class JsoupService {

    public static String getFoodData(String foodName){
        String stockList = getHref(foodName);

        if(stockList == null){
            return "죄송합니다. 정보를 찾을 수 없습니다.";
        }

        Connection conn = Jsoup.connect(stockList);

        try {
            Document document = conn.get();
            Elements liList = document.getElementsByClass("nutrition_facts international");
            StringBuilder sb = new StringBuilder();

            for (Element element : liList) {
                sb.append(element.text());
            }

            System.out.println(sb);
            return sb.toString();

        }catch (Exception e) {
            return "죄송합니다. 정보를 찾을 수 없습니다.";
        }

    }

    public static String getHref(String foodName) {

        String stockList = "https://www.fatsecret.kr/칼로리-영양소/search?q="+foodName;
        Connection conn = Jsoup.connect(stockList);

        try {
            Document document = conn.get();

            Elements liList = document.select(".searchResult .prominent ");

            for (Element element : liList) {
                if(element.text().equals(foodName)){
                    String href = element.attr("href");
                    String decodeResult = URLDecoder.decode(href,"UTF-8");
                    return "https://www.fatsecret.kr/"+decodeResult;
                }
            }

            return null;

        } catch (IOException ignored) {
            return null;
        }
    }

}
