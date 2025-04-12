package com.example.web3;



import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Named("formBean")
@SessionScoped
public class FormBean implements Serializable {
    private Integer x;
    private Integer r;
    private String result;

    public Integer getX() {
        return x;
    }
    public Integer get1(){
        return 1;
    }

    public void setX(Integer x) {
        this.x = x;
    }

    public Integer getR() {
        return r;
    }

    public void setR(Integer r) {
        this.r = r;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    // Метод проверки точки
    public void checkPoint() {
        // Ваша логика проверки точки (например, проверка, попадает ли точка в область)
        if (x != null && r != null) {
            // Пример логики
            if (Math.abs(x) <= r) {
                result = "Точка попадает в область!";
            } else {
                result = "Точка не попадает в область.";
            }
        }
    }

    // Получение значений для координаты X от -4 до 4
    public List<Integer> getXOptions() {
        List<Integer> options = new ArrayList<>();
        for (int i = -4; i <= 4; i++) {
            options.add(i);
        }
        return options;
    }

    // Получение значений радиуса R от 1 до 5
    public List<Integer> getROptions() {
        List<Integer> options = new ArrayList<>();
        for (int i = 1; i <= 5; i++) {
            options.add(i);
        }
        return options;
    }
}