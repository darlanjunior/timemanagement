require 'rails_helper'

RSpec.describe Admin do
  describe '#create' do
    subject do
      Admin.create(
        email: 'email@email.com',
        password: '1234qwer',
        name: 'a name'
      ).errors.messages
    end

    it {is_expected.to be_empty}
  end
end
