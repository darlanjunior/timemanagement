require 'rails_helper'

RSpec.describe EndUser do
  describe '#create' do
    subject do
      EndUser.create(
        email: 'email@email.com',
        password: '1234qwer',
        name: 'a name',
        preferred_working_hours: pwh
      ).errors.messages
    end

    context 'when preferred_working_hours has no numbers' do
      let(:pwh) { 'asdf' }
      it {is_expected.to match({preferred_working_hours: ['invalid format']})}
    end

    context 'when preferred_working_hours does not have the colon' do
      let(:pwh) { '0800' }
      it {is_expected.to match({preferred_working_hours: ['invalid format']})}
    end

    context 'when preferred_working_hours has invalid hours value' do
      let(:pwh) { '24:00' }
      it {is_expected.to match({preferred_working_hours: ['invalid format']})}
    end

    context 'when no preferred_working_hours is correct' do
      let(:pwh) { '23:59' }
      it {is_expected.to be_empty}
    end
  end
end
