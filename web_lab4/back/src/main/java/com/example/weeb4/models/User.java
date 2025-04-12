package com.example.weeb4.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "web_users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Point> points;


    public User(String name, String password) {
        this.setPoints(new ArrayList<>());
        this.setUsername(name);
        this.setPassword(password);
    }

    public User() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }



    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "id: %s name: %s password: %s".formatted(id, username, password);
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    public List<Point> getPoints() {
        return points;
    }

    public String getPointsAsJson() {
        StringBuilder jsonBuilder = new StringBuilder("[");

        for (int i = 0; i < points.size(); i++) {
            Point point = points.get(i);
            jsonBuilder.append("{")
                    .append("\"id\":").append(point.getId()).append(",")
                    .append("\"x\":").append(point.getX()).append(",")
                    .append("\"y\":").append(point.getY()).append(",")
                    .append("\"radius\":").append(point.getRadius()).append(",")
                    .append("\"result\":").append(point.isResult()).append(",")
                    .append("\"cur_time\":\"").append(point.getCur_time()).append("\",")
                    .append("\"script_time\":\"").append(point.getScript_time()).append("\",")
                    .append("\"user_id\":").append(point.getUser() != null ? point.getUser().getId() : null)
                    .append("}");

            if (i < points.size() - 1) {
                jsonBuilder.append(",");
            }
        }

        jsonBuilder.append("]");
        return jsonBuilder.toString();
    }

    public void setPoints(List<Point> points) {
        this.points = points;
    }
}
