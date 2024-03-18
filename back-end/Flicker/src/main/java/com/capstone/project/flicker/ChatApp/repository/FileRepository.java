package com.capstone.project.flicker.ChatApp.repository;

import com.capstone.project.flicker.ChatApp.model.File;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FileRepository extends JpaRepository<File, Long> {
    Optional<File> findByStoredFileName(String storedFileName);
    Optional<File> findById(Long id);
    Optional<File> findByUrl(String url);
    @Query(value = "SELECT f.* FROM file f WHERE f.conversation = :conversationId ORDER BY f.created_at DESC", nativeQuery = true)
    public Page<File> findAllInConversation(Pageable pageable, @Param("conversationId") Long conversationId);
   /* @Query(value = "SELECT f.* FROM file f WHERE f.conversation = :conversationId AND f.content_type LIKE '%application%' ORDER BY f.created_at DESC", nativeQuery = true)
    public Page<File> findDocsInConversation(Pageable pageable, @Param("conversationId") Long conversationId);
*/
    @Query(value = "SELECT f.* FROM file f " +
            "JOIN conversation_user_setting cus ON f.conversation = cus.conversation_id AND cus.user_id = :userId " +
            "WHERE f.conversation = :conversationId AND f.content_type LIKE '%application%' " +
            "AND (cus.date_joined IS NULL OR f.created_at >= cus.date_joined) " +
            "AND (cus.date_left IS NULL OR f.created_at <= cus.date_left) " +
            "ORDER BY f.created_at DESC", nativeQuery = true)
    public Page<File> findDocsInConversation(Pageable pageable, @Param("conversationId") Long conversationId, @Param("userId") Long userId);

    @Query(value = "SELECT f.* FROM file f " +
            "JOIN archived_conversation ac ON f.conversation = ac.conversation_id AND ac.user_id = :userId\n" +
            "LEFT JOIN conversation_user_setting cus ON f.conversation = cus.conversation_id AND cus.user_id = :userId " +
            "WHERE f.conversation = :conversationId AND f.content_type LIKE '%application%' " +
            "AND f.created_at <= ac.updated_at\n" +
            "AND (cus.date_joined IS NULL OR f.created_at >= cus.date_joined) " +
            "AND (cus.date_left IS NULL OR f.created_at <= cus.date_left) " +
            "  AND f.message NOT IN (SELECT mus.message_id \n" +
            "  FROM message_user_setting mus WHERE mus.user_id = :userId AND mus.conversation_id = :conversationId AND (mus.archived = false OR mus.hidden = true)) \n" +
            "ORDER BY f.created_at DESC", nativeQuery = true)
    public Page<File> findArchivedDocsInConversation(Pageable pageable, @Param("conversationId") Long conversationId, @Param("userId") Long userId);

    @Query(value = "SELECT f.* FROM file f " +
            "JOIN archived_conversation ac ON f.conversation = ac.conversation_id AND ac.user_id = :userId\n" +
            "LEFT JOIN conversation_user_setting cus ON f.conversation = cus.conversation_id AND cus.user_id = :userId " +
            "WHERE f.conversation = :conversationId AND f.content_type LIKE '%application%' " +
            "  AND f.created_at > ac.updated_at\n" +
            "AND (cus.date_joined IS NULL OR f.created_at >= cus.date_joined) " +
            "AND (cus.date_left IS NULL OR f.created_at <= cus.date_left) " +
            "  AND f.message NOT IN (SELECT mus.message_id \n" +
            "  FROM message_user_setting mus WHERE mus.user_id = :userId AND mus.conversation_id = :conversationId AND (mus.archived = true OR mus.hidden = true)) \n" +
            "ORDER BY f.created_at DESC", nativeQuery = true)
    public Page<File> findNonArchivedDocsInConversation(Pageable pageable, @Param("conversationId") Long conversationId, @Param("userId") Long userId);

    /*@Query(value = "SELECT f.* FROM file f WHERE f.conversation = :conversationId AND f.content_type NOT LIKE '%application%' ORDER BY f.created_at DESC", nativeQuery = true)
    public Page<File> findMediaInConversation(Pageable pageable, @Param("conversationId") Long conversationId);*/

    @Query(value = "SELECT f.* FROM file f " +
            "JOIN conversation_user_setting cus ON f.conversation = cus.conversation_id AND cus.user_id = :userId " +
            "WHERE f.conversation = :conversationId AND f.content_type NOT LIKE '%application%' " +
            "AND (cus.date_joined IS NULL OR f.created_at >= cus.date_joined) " +
            "AND (cus.date_left IS NULL OR f.created_at <= cus.date_left) " +
            "ORDER BY f.created_at DESC", nativeQuery = true)
    public Page<File> findMediaInConversation(Pageable pageable, @Param("conversationId") Long conversationId, @Param("userId") Long userId);

    @Query(value = "SELECT f.* FROM file f " +
            "JOIN archived_conversation ac ON f.conversation = ac.conversation_id AND ac.user_id = :userId\n" +
            "LEFT JOIN conversation_user_setting cus ON f.conversation = cus.conversation_id AND cus.user_id = :userId " +
            "WHERE f.conversation = :conversationId AND f.content_type NOT LIKE '%application%' " +
            "AND f.created_at <= ac.updated_at\n" +
            "AND (cus.date_joined IS NULL OR f.created_at >= cus.date_joined) " +
            "AND (cus.date_left IS NULL OR f.created_at <= cus.date_left) " +
            "  AND f.message NOT IN (SELECT mus.message_id \n" +
            "  FROM message_user_setting mus WHERE mus.user_id = :userId AND mus.conversation_id = :conversationId AND (mus.archived = false OR mus.hidden = true)) \n" +
            "ORDER BY f.created_at DESC", nativeQuery = true)
    public Page<File> findArchivedMediaInConversation(Pageable pageable, @Param("conversationId") Long conversationId, @Param("userId") Long userId);

    @Query(value = "SELECT f.* FROM file f " +
            "JOIN archived_conversation ac ON f.conversation = ac.conversation_id AND ac.user_id = :userId\n" +
            "LEFT JOIN conversation_user_setting cus ON f.conversation = cus.conversation_id AND cus.user_id = :userId " +
            "WHERE f.conversation = :conversationId AND f.content_type NOT LIKE '%application%' " +
            "AND f.created_at > ac.updated_at\n" +
            "AND (cus.date_joined IS NULL OR f.created_at >= cus.date_joined) " +
            "AND (cus.date_left IS NULL OR f.created_at <= cus.date_left) " +
            "  AND f.message NOT IN (SELECT mus.message_id \n" +
            "  FROM message_user_setting mus WHERE mus.user_id = :userId AND mus.conversation_id = :conversationId AND (mus.archived = true OR mus.hidden = true)) \n" +
            "ORDER BY f.created_at DESC", nativeQuery = true)
    public Page<File> findNonArchivedMediaInConversation(Pageable pageable, @Param("conversationId") Long conversationId, @Param("userId") Long userId);

}
