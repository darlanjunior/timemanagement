class UserMailer < ApplicationMailer
  default from: 'notifications@example.com'

  def welcome_email(user, password)
    @user = user
    @password = password

    mail(to: user.email, subject: 'An account has been created for you')
  end
end
