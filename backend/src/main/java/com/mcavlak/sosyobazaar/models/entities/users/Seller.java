package com.mcavlak.sosyobazaar.models.entities.users;

import com.mcavlak.sosyobazaar.enums.Role;
import com.mcavlak.sosyobazaar.models.entities.Industry;
import com.mcavlak.sosyobazaar.models.entities.Province;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter(AccessLevel.PROTECTED)
@DiscriminatorValue("seller")
public class Seller extends User {

    private String storeName;

    @ManyToOne
    private Province province;

    @ManyToOne
    private Industry industry;

    @ManyToMany
    @JoinTable(name="seller_customer",
            joinColumns=@JoinColumn(name="seller_id"),
            inverseJoinColumns=@JoinColumn(name="customer_id") )
    private Set<Customer> followers;

    protected Seller() {
        this.setRole(Role.ROLE_SELLER);
    }

    public static Seller create(String username, String password, String storeName,Province province,Industry industry){
        Seller seller = new Seller();
        seller.setUsername(username);
        seller.setPassword(password);
        seller.storeName = storeName;
        seller.province = province;
        seller.industry = industry;
        return seller;
    }

}
