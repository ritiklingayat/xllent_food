package com.example.xllent_ecommerce.serviceImpl;

import com.example.xllent_ecommerce.dto.request.UserRequest;
import com.example.xllent_ecommerce.dto.response.UserResponse;
import com.example.xllent_ecommerce.entity.Role;
import com.example.xllent_ecommerce.entity.Status;
import com.example.xllent_ecommerce.entity.User;
import com.example.xllent_ecommerce.repository.UserRepository;
import com.example.xllent_ecommerce.service.CloudinaryService;
import com.example.xllent_ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CloudinaryService cloudinaryService;
    private final ModelMapper modelMapper;

    @Override
    public UserResponse createUser(UserRequest request,User currentUser) {

        try {

            // ==========================
            // Duplicate Email Check
            // ==========================
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new RuntimeException("Email already exists.");
            }

            // ==========================
            // Duplicate Mobile Check
            // ==========================
            if (userRepository.existsByMobile(request.getMobile())) {
                throw new RuntimeException("Mobile number already exists.");
            }

            // ==========================
            // Duplicate GSTIN Check
            // ==========================
            if (request.getGstino() != null &&
                    !request.getGstino().isBlank() &&
                    userRepository.existsByGstino(request.getGstino())) {

                throw new RuntimeException("GSTIN already exists.");
            }

            // =========================================================================
            // FIXED HERE: Configure an explicit isolated mapper instance.
            // We explicitly skip mapping 'profileImage' because it's a MultipartFile
            // mapping into a String field, which causes ModelMapper to break matching.
            // =========================================================================
            org.modelmapper.ModelMapper creationMapper = new org.modelmapper.ModelMapper();
            creationMapper.typeMap(UserRequest.class, User.class).addMappings(mapper ->
                    mapper.skip(User::setProfileImage) // Uses the destination function mapping rule
            );

            // ==========================
            // Convert DTO -> Entity
            // ==========================
            User user = new User();

            user.setFirstName(request.getFirstName().strip());
            user.setLastName(request.getLastName().strip());
            user.setCompany(request.getCompany().strip());
            user.setGstino(request.getGstino().strip());
            user.setPanCard(request.getPanCard().strip());
            user.setAadhaarCard(request.getAadhaarCard().strip());
            user.setEmail(request.getEmail().strip());
            user.setMobile(request.getMobile().strip());
            user.setGender(request.getGender().strip());
            user.setRole(request.getRole());
            user.setState(request.getState().strip());
            user.setDistrict(request.getDistrict().strip());
            user.setCity(request.getCity().strip());
            user.setPincode(request.getPincode().strip());
            user.setAddress(request.getAddress().strip());
            user.setPanCard(request.getPanCard().strip());
            user.setAadhaarCard(request.getAadhaarCard().strip());

            // ==========================
            // Set Parent User
            // ==========================


                validateHierarchy(
                        currentUser.getRole(),
                        request.getRole()
                );
            user.setParent(currentUser);


            // ==========================
            // Encrypt Password
            // ==========================
            user.setPassword(
                    passwordEncoder.encode(request.getPassword())
            );

            // ==========================
            // Default Status
            // ==========================
            user.setStatus(Status.ACTIVE);

            // ==========================
            // Upload Profile Image
            // ==========================
            if (request.getProfileImage() != null
                    && !request.getProfileImage().isEmpty()) {

                String imageUrl = cloudinaryService.uploadImage(
                        request.getProfileImage()
                );

                // Manually setting the text string URL securely post-mapping
                user.setProfileImage(imageUrl);
            }

            // ==========================
            // Save User
            // ==========================
            User savedUser = userRepository.save(user);


            System.out.println("========== CREATE USER ==========");
            System.out.println("User ID before save = " + user.getId());
            System.out.println("First Name = " + user.getFirstName());
            System.out.println("Email = " + user.getEmail());

            // ==========================
            // Return Response
            // ==========================
            return convertToResponse(savedUser);

        } catch (IOException e) {
            throw new RuntimeException("Image upload failed.", e);
        }
    }

    @Override
    public UserResponse updateUser(Long id, UserRequest request) {

        try {
            User user = userRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // ==========================
            // Duplicate Email Check
            // ==========================
            if (request.getEmail() != null
                    && !request.getEmail().isBlank()
                    // FIXED: Objects.equals safely handles null comparison
                    && !Objects.equals(user.getEmail(), request.getEmail())
                    && userRepository.existsByEmail(request.getEmail())) {

                throw new RuntimeException("Email already exists.");
            }

            // ==========================
            // Duplicate Mobile Check
            // ==========================
            if (request.getMobile() != null
                    && !request.getMobile().isBlank()
                    // FIXED: Objects.equals safely handles null comparison
                    && !Objects.equals(user.getMobile(), request.getMobile())
                    && userRepository.existsByMobile(request.getMobile())) {

                throw new RuntimeException("Mobile number already exists.");
            }

            // ==========================
            // Duplicate GSTIN Check
            // ==========================
            if (request.getGstino() != null
                    && !request.getGstino().isBlank()
                    // FIXED: Objects.equals completely protects against user.getGstino() being null in the DB
                    && !Objects.equals(user.getGstino(), request.getGstino())
                    && userRepository.existsByGstino(request.getGstino())) {

                throw new RuntimeException("GSTIN already exists.");
            }

            // ==========================
// Update Basic Details
// ==========================
            org.modelmapper.ModelMapper strictMapper = new org.modelmapper.ModelMapper();

            strictMapper.getConfiguration()
                    .setSkipNullEnabled(true)
                    .setPropertyCondition(org.modelmapper.Conditions.isNotNull());

// Skip fields that are handled manually
            strictMapper.typeMap(UserRequest.class, User.class)
                    .addMappings(mapper -> {
                        mapper.skip(User::setProfileImage);
                        mapper.skip(User::setParent);
                        mapper.skip(User::setRole);
                    });

            user.setFirstName(request.getFirstName().strip());
            user.setLastName(request.getLastName().strip());
            user.setCompany(request.getCompany().strip());
            user.setGstino(request.getGstino().strip());
            user.setPanCard(request.getPanCard().strip());
            user.setAadhaarCard(request.getAadhaarCard().strip());
            user.setEmail(request.getEmail().strip());
            user.setMobile(request.getMobile().strip());
            user.setGender(request.getGender().strip());
            user.setState(request.getState().strip());
            user.setDistrict(request.getDistrict().strip());
            user.setCity(request.getCity().strip());
            user.setPincode(request.getPincode().strip());
            user.setAddress(request.getAddress().strip());

            // ==========================
            // Update Password
            // ==========================
            if (request.getPassword() != null
                    && !request.getPassword().isBlank()) {

                user.setPassword(
                        passwordEncoder.encode(request.getPassword())
                );
            }

            // ==========================
// Update Parent & Validate Role
// ==========================

            User parent = user.getParent();

            if (request.getParentId() != null) {

                parent = userRepository.findById(request.getParentId())
                        .orElseThrow(() ->
                                new RuntimeException("Parent not found."));

                validateHierarchy(
                        parent.getRole(),
                        user.getRole()
                );

                user.setParent(parent);
            }

            if (request.getRole() != null && parent != null) {

                validateHierarchy(
                        parent.getRole(),
                        request.getRole()
                );

                user.setRole(request.getRole());
            }

            // ==========================
            // Update Profile Image
            // ==========================
            if (request.getProfileImage() != null
                    && !request.getProfileImage().isEmpty()) {

                // Delete old image
                if (user.getProfileImage() != null) {
                    cloudinaryService.deleteImage(user.getProfileImage());
                }

                // Upload new image
                String imageUrl = cloudinaryService.uploadImage(
                        request.getProfileImage()
                );

                user.setProfileImage(imageUrl);
            }





            User updatedUser = userRepository.save(user);

            return convertToResponse(updatedUser);

        } catch (IOException e) {
            throw new RuntimeException("Image upload failed.", e);
        }
    }


    @Override
    public void deleteUser(Long id) {

        try {

            User user = userRepository.findById(id)
                    .orElseThrow(() ->
                            new RuntimeException("User not found"));

            // ==========================
            // Check Child Users
            // ==========================
            if (userRepository.existsByParentId(id)) {
                throw new RuntimeException(
                        "Cannot delete user because child users exist."
                );
            }

            // Delete Cloudinary Image
            if (user.getProfileImage() != null) {

                cloudinaryService.deleteImage(user.getProfileImage());

            }

            userRepository.delete(user);

        } catch (IOException e) {

            throw new RuntimeException("Unable to delete image.", e);

        }

    }

    @Override
    public UserResponse getUserById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return convertToResponse(user);
    }

    @Override
    public List<UserResponse> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Override
    public List<UserResponse> getUsersByRole(Role role) {

        return userRepository.findByRole(role)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Override
    public List<UserResponse> getUsersCreatedBy(Long parentId) {

        return userRepository.findByParentId(parentId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    private void validateHierarchy(Role parentRole, Role childRole) {

        switch (parentRole) {

            case SUPER_ADMIN:
                // Can create everyone except another SUPER_ADMIN
                if (childRole == Role.SUPER_ADMIN) {
                    throw new RuntimeException("Super Admin cannot create another Super Admin.");
                }
                break;

            case ADMIN:
                if (childRole != Role.SUPER_STOCKIST &&
                        childRole != Role.DISTRIBUTOR &&
                        childRole != Role.WHOLESELLER) {

                    throw new RuntimeException(
                            "Admin can only create Super Stockist, Distributor or Wholeseller."
                    );
                }
                break;

            case SUPER_STOCKIST:
                if (childRole != Role.DISTRIBUTOR &&
                        childRole != Role.WHOLESELLER) {

                    throw new RuntimeException(
                            "Super Stockist can only create Distributor or Wholeseller."
                    );
                }
                break;

            case DISTRIBUTOR:
                if (childRole != Role.WHOLESELLER) {
                    throw new RuntimeException(
                            "Distributor can only create Wholeseller."
                    );
                }
                break;

            case WHOLESELLER:
                throw new RuntimeException(
                        "Wholeseller cannot create users."
                );
        }
    }

    private UserResponse convertToResponse(User user) {

        UserResponse response = new UserResponse();

        response.setId(user.getId());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setCompany(user.getCompany());
        response.setEmail(user.getEmail());
        response.setMobile(user.getMobile());
        response.setGender(user.getGender());
        response.setRole(user.getRole());
        response.setStatus(user.getStatus());
        response.setState(user.getState());
        response.setDistrict(user.getDistrict());
        response.setCity(user.getCity());
        response.setPincode(user.getPincode());
        response.setAddress(user.getAddress());
        response.setPanCard(user.getPanCard());
        response.setAadhaarCard(user.getAadhaarCard());
        response.setProfileImage(user.getProfileImage());

        if (user.getParent() != null) {

            User parent = user.getParent();

            response.setParentId(parent.getId());

            response.setParentName(
                    parent.getFirstName() + " " +
                            parent.getLastName()
            );

            response.setParentRole(parent.getRole());
        }

        return response;
    }

}