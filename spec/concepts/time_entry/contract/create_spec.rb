require 'ostruct'
require 'rails_helper'
RSpec.describe TimeEntry::Contract::Create do
  describe '#validate' do
    before do
      @user = EndUser.new({
        email: 'asdf@asdf.asdf',
        name: 'asdf',
        password: '12345678'
      })

      @user.skip_confirmation!
      @user.save

      @model = described_class.new(TimeEntry.new)
    end

    subject { @model.validate(contract) }

    context 'valid contract' do
      let(:contract) {{
        user: @user,
        name: 'oi',
        description: 'oi',
        duration: '08:00',
        date: '2017-12-31'
      }}

      it do
        is_expected.to be_truthy
        expect(@model.errors.messages).to be_empty
      end
    end

    context 'invalid duration' do
      let(:contract) {{
        user: @user,
        name: 'oi',
        description: 'oi',
        duration: 'asdf',
        date: '2017-12-31'
      }}

      it do
        is_expected.to be_falsy
        expect(@model.errors.messages).to match({
          duration: ['must be a time']
        })
      end
    end

    context 'invalid date' do
      let(:contract) {{
        user: @user,
        name: 'oi',
        description: 'oi',
        duration: '08:00',
        date: '2017-31-12'
      }}

      it do
        is_expected.to be_falsy
        expect(@model.errors.messages).to match({
          date: ['must be a date']
        })
      end
    end

    context 'missing name' do
      let(:contract) {{
        user: @user,
        description: 'oi',
        duration: '08:00',
        date: '2017-12-31'
      }}
      it do
        is_expected.to be_falsy
        expect(@model.errors.messages).to match({
          name: ['must be filled']
        })
      end
    end

    context 'entry exists on date' do
      before do
        TimeEntry.create(
          name: 'filling',
          description: 'filling',
          date: '2017-12-31',
          duration: '00:10',
          user: @user
        )
      end

      context 'more than 24 hours total' do
        let(:contract) {{
          user: @user,
          name: 'oi',
          description: 'oi',
          duration: '23:51',
          date: '2017-12-31'
        }}

        it do
          is_expected.to be_falsy
          expect(@model.errors.messages).to match({
            duration: ["more than 24 hours on a single date"]
          })
        end
      end

      context 'fewer than 24 hours total' do
        let(:contract) {{
          user: @user,
          name: 'oi',
          description: 'oi',
          duration: '23:49',
          date: '2017-12-31'
        }}

        it do
          is_expected.to be_truthy
          expect(@model.errors.messages).to be_empty
        end
      end
    end

  end
end
