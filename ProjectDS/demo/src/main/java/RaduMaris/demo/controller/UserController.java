package RaduMaris.demo.controller;

import RaduMaris.demo.entity.User;
import RaduMaris.demo.service.UserService;
import RaduMaris.demo.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    @Autowired
    public UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/getAll")
    @ResponseBody
    public List<User> retriveAllUsers(){
        return this.userService.retriveUsers();
    }

    @GetMapping("/getById/{id}")
    @ResponseBody
    public User getById(@PathVariable Long id) {
        return this.userService.getByIdUser(id);
    }

    @PostMapping("/add")
    @ResponseBody
    public User addUser(@RequestBody User user) {
        User u = this.userService.insertUser(user);

        return u;
    }

    @PutMapping("/update")
    @ResponseBody
    public User updateUser(@RequestBody User user) {
        return this.userService.updateUser(user);
    }

    @DeleteMapping("/delete")
    @ResponseBody
    public String deleteUser(@RequestParam Long id) {
        return this.userService.deleteUser(id);
    }

    @GetMapping("/login")
    @ResponseBody
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password) {
        try {
            User user = userService.login(username, password);
            String token = jwtUtil.generateToken(user.getUsername());

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("userId", user.getUserId());
            response.put("username", user.getUsername());
            response.put("role", user.getRole());

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
