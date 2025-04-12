package com.example.weeb4.models;


import jakarta.persistence.*;

import java.io.StringWriter;

@Entity
@Table(name="web_points")
public class Point {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private Float x;
    @Column(nullable = false)
    private Float y;
    @Column(nullable = false)
    private Float radius;

    @Column(nullable = false)
    private boolean result;

    @Column(nullable = false)
    private String cur_time;

    @Column(nullable = false)
    private float script_time;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Float getX() {
        return x;
    }

    public void setX(Float x) {
        this.x = x;
    }

    public Float getY() {
        return y;
    }

    public void setY(Float y) {
        this.y = y;
    }

    public Float getRadius() {
        return radius;
    }

    public void setRadius(Float radius) {
        this.radius = radius;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public String getCur_time() {
        return cur_time;
    }

    public void setCur_time(String cur_time) {
        this.cur_time = cur_time;
    }

    public float getScript_time() {
        return script_time;
    }

    public void setScript_time(float script_time) {
        this.script_time = script_time;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        StringBuilder jsonBuilder = new StringBuilder();
        jsonBuilder.append("{")
                .append("\"id\":").append(this.getId()).append(",")
                .append("\"x\":").append(this.getX()).append(",")
                .append("\"y\":").append(this.getY()).append(",")
                .append("\"radius\":").append(this.getRadius()).append(",")
                .append("\"result\":").append(this.isResult()).append(",")
                .append("\"cur_time\":\"").append(this.getCur_time()).append("\",")
                .append("\"script_time\":\"").append(this.getScript_time()).append("\",")
                .append("\"user_id\":").append(this.getUser() != null ? this.getUser().getId() : null)
                .append("}");
        return jsonBuilder.toString();
    }
}
