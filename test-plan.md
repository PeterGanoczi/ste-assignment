# Test Plan

## User Registration and Login:
1. **Register with valid credentials:**
   - Action: User provides valid username, email, and password and click on Submit button.
   - Expected Result: Registration is successful, and the user is logged in.

2. **Register with existing username and email:**
   - Action: User attempts to register with an username and email that are already in use.
   - Expected Result: User receives an error message indicating that the username and email is already registered.

3. **Register with missing information:**
   - Action: User attempts to register without providing all required information.
   - Expected Result: User receives error messages indicating the missing fields.

4. **Register with invalid password:**
   - Action: User attempts to register with an invalid password which does not meet security policy, at least 8 characters.
   - Expected Result: User receives an error message that password.

5. **Redirection from Sign in screen:**
   - Action: User goes to Sign in screen but haven't created an accout yet, so can be redirected to Sign up screen via 'Need an account?' button.
   - Expected Result: User is redirected to Sign up screen.

6. **Login with correct credentials:**
   - Action: User enters valid email and password.
   - Expected Result: User is successfully logged in and directed to their dashboard.

7. **Login with incorrect email:**
   - Action: User enters an incorrect email and valid password.
   - Expected Result: User receives an error message indicating that the email is incorrect.

8. **Login with incorrect password:**
   - Action: User enters a valid email and an incorrect password.
   - Expected Result: User receives an error message indicating that the password is incorrect.

9. **Logout User:**
   - Action: User opens settings and click on Logout button.
   - Expected Result: User is logged out and redirected to home page.

10. **Redirection from Sign up screen:**
   - Action: User goes to Sign up screen but already have an account so can be redirected to Sign in screen via 'Have an account?' button.
   - Expected Result: User is redirected to Sign in screen.

11. **Login/Registration screen is unavailable:**
   - Action: Already logged in user try to get to Sign up/Sign in screen by changing a URL.
   - Expected Result: User is redirected back to home page.

## User Profile Management:
12. **Update profile information:**
   - Action: User updates their profile information, profile image, username, bio, email and password.
   - Expected Result: Profile information are updated successfully and user is able to login with new email and password.

13. **Update profile with invalid email:**
   - Action: User attempts to update their email with an invalid format.
   - Expected Result: User receives an error message indicating that the email format is invalid.

14. **Update profile with invalid password:**
   - Action: User attempts to update their password with less than 8 characters.
   - Expected Result: User receives an error message indicating that the password must have at least 8 characters.

## Article Management:
15. **Create new article:**
   - Action: User creates a new article with a title, content, and tags.
   - Expected Result: Article is successfully created and article page is displayed.

16. **Create article with missing title, about or text:**
    - Action: User attempts to create an article without a title, about or text.
    - Expected Result: User is not able to submit article as Publish article button is disabled.

17. **Create article with missing tags:**
    - Action: User attempts to create an article without a tags.
    - Expected Result: User is able to create article without tag.

18. **Update existing article:**
    - Action: User edits an existing article, by modifying its content.
    - Expected Result: Article is updated successfully with the new content.

19. **Delete article:**
    - Action: User deletes an existing article.
    - Expected Result: Article is removed from the system and no longer visible on the user's profile.

## Reading and Interacting with Articles:
20. **Read articles from other users:**
    - Action: User navigates to articles written by other users.
    - Expected Result: Articles from other users are displayed correctly.

21. **Set article as favorite:**
    - Action: User set any article as favorite.
    - Expected Result: User can simple get back to favorite articles from his/her profile in Favorited articles.

22. **Filter articles by tags:**
    - Action: User selects a tag to filter articles.
    - Expected Result: Only articles with the selected tag are displayed.

## Following and Feed:
23. **Follow another user:**
    - Action: User chooses to follow another user.
    - Expected Result: User successfully follows the selected user.

24. **Unfollow a user:**
    - Action: User decides to unfollow a user.
    - Expected Result: User successfully unfollows the selected user.

## BUGS found:
1. Pagination is displayed in My articles even when only article is present.(More like assumption, don't know requirements.)
2. Update password has no security policy check, user is able to update password with only 1 character.
3. After delete of article, nothing happened, user is stuck on article page.
4. Article screen has duplicitly name of author, date and delete, update and favorite article button.(More like assumption, don't know requirements.)
5. Mobile responsiveness:
    - tags are hidden under footer
    - missing pagination by sided between articles and side
