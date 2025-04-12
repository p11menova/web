package com.example.weeb4.areaCheck;

public class AreaChecker {

    public static boolean check(float x, float y, float r) {
        return inFirst(x, y, r) || inSecond(x, y, r) || inThird(x, y, r) || inFourth(x, y, r);
    }

    public static boolean inFirst(float x, float y, float r) {
        if (0 <= x && 0 <= y) {
            return y <= -x + r / 2;
        }
        return false;
    }

    public static boolean inSecond(float x, float y, float r) {
        if (x <= 0 & y >= 0) {
            return -r <= x && y <= r / 2;
        }
        return false;
    }

    public static boolean inThird(float x, float y, float r) {
        return false;
    }

    public static boolean inFourth(float x, float y, float r) {
        if (x >= 0 && y <= 0) {
            return x * x + y * y <= r * r / 4;
        }
        return false;
    }
}
