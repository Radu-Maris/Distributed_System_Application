package RaduMaris.demo.service;

import RaduMaris.demo.entity.User;
import RaduMaris.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    public UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> retriveUsers() {
        return (List<User>) userRepository.findAll();
    }

    public User getByIdUser(long id) {
        Optional<User> user = userRepository.findById(id);
        return user.get();
    }

    public User insertUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        List<User> list = retriveUsers();

        User userInserted = userRepository.findUserByUsername(user.getUsername());

        if(userInserted != null) {
            return null;
        }

        user.setRole("user");

        return userRepository.save(user);
    }

    public String deleteUser(Long userId){
        try{
            this.userRepository.deleteById(userId);
            return "Deleted";
        }
        catch(Exception e){
            return "Failed to delete entry with id: " + userId;
        }
    }

    public User login(String username, String password) {
        User user = this.userRepository.findUserByUsername(username);

        if (passwordEncoder.matches(password, user.getPassword())) {
            return user;
        } else {
            throw new RuntimeException("Invalid password");
        }
    }

    public User updateUser(User updatedUser) {
        Optional<User> existingUserOpt = userRepository.findById(updatedUser.getUserId());
        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();

            if (updatedUser.getUsername() != null && !updatedUser.getUsername().isEmpty()) {
                existingUser.setUsername(updatedUser.getUsername());
            }

            if (updatedUser.getFirstName() != null && !updatedUser.getFirstName().isEmpty()) {
                existingUser.setFirstName(updatedUser.getFirstName());
            }

            if (updatedUser.getLastName() != null && !updatedUser.getLastName().isEmpty()) {
                existingUser.setLastName(updatedUser.getLastName());
            }

            if (updatedUser.getRole() != null && !updatedUser.getRole().isEmpty()) {
                existingUser.setRole(updatedUser.getRole());
            }

            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty() &&
                    !passwordEncoder.matches(updatedUser.getPassword(), existingUser.getPassword())) {
                existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            }

            return userRepository.save(existingUser);
        } else {
            throw new RuntimeException("User not found with ID: " + updatedUser.getUserId());
        }
    }

}
