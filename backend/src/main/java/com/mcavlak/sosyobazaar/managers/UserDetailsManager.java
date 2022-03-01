package com.mcavlak.sosyobazaar.managers;

import com.mcavlak.sosyobazaar.models.CustomUserDetails;
import com.mcavlak.sosyobazaar.models.entities.users.User;
import com.mcavlak.sosyobazaar.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserDetailsManager implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsManager(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public CustomUserDetails loadUserByUsername(String username) {

        Optional<User> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isPresent()) {
            return new CustomUserDetails(optionalUser.get());
        } else {
            throw new UsernameNotFoundException("Kullanıcı Adınızı Veya Şifrenizi Yanlış Girdiniz.");
        }

    }

}
