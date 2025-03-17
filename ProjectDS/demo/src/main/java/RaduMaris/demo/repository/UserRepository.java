package RaduMaris.demo.repository;

import RaduMaris.demo.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface UserRepository extends CrudRepository<User, Long> {

    User findUserByUsername(String username);

}
