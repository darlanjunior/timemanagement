require 'rails_helper'

RSpec.describe Manager do
  describe '#create' do
    subject do
      Manager.create(
        email: 'email@email.com',
        password: '1234qwer',
        name: 'a name',
        preferred_working_hours: pwh
      ).errors.messages
    end

    context 'when no preferred_working_hours is set' do
      let(:pwh) { nil }
      it {is_expected.to be_empty}
    end

    context 'when preferred_working_hours is set' do
      let(:pwh) { '08:00' }
      it {is_expected.to_not be_empty}
    end
  end
end
