require 'rails_helper'

RSpec.describe TimeEntry::List do
  describe '#call' do
    before do
      @user = User.new({
        email: 'asdf@asdf.asdf',
        name: 'asdf',
        role: role,
        password: '12345678',
        preferred_working_hours: '06:01'
      })
      @another_user = User.new({
        email: 'asdf2@asdf.asdf',
        name: 'asdf2',
        role: 'EndUser',
        password: '12345678',
      })

      TimeEntry::Create.({
        name: 'my task',
        date: '2017-12-31',
        duration: '06:00',
        user: @user
      }, 'current_user' => @user)

      TimeEntry::Create.({
        name: 'his task',
        date: '2017-12-31',
        duration: '08:00',
        user: @another_user
      }, 'current_user' => @another_user)

      @user.skip_confirmation!
      @another_user.skip_confirmation!
      @user.save
      @another_user.save
    end

    subject { JSON.parse(described_class.call(params, user: user, 'current_user' => @user)[:'result.json']) }

    context 'EndUser' do
      let(:role) { 'EndUser' }
      let(:user) { @user }
      let(:params) {{
        user: @user
      }}
      let(:expected) {[
        a_hash_including({
          'id' => a_kind_of(String),
          'attributes' => a_hash_including({
            'name' => 'my task',
            'green' => false
          })
        })
      ]}

      it { expect(subject['data']).to match(expected) }
    end

    context 'Manager' do
      let(:role) { 'Manager' }
      let(:user) { @user }
      let(:params) {{
        user: @user
      }}
      let(:expected) {[
        a_hash_including({
          'id' => a_kind_of(String),
          'attributes' => a_hash_including({
            'name' => 'my task',
            'green' => false
          })
        })
      ]}

      it { expect(subject['data']).to match(expected) }
    end

    context 'Admin' do
      let(:role) { 'Admin' }
      let(:user) { @user }
      let(:params) {{
        user: @user
      }}
      let(:expected) {[
        a_hash_including({
          'id' => a_kind_of(String),
          'attributes' => a_hash_including({
            'name' => 'my task',
            'green' => false
          })
        })
      ]}

      it { expect(subject['data']).to match(expected) }
    end
  end
end
