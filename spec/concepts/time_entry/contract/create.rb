require 'ostruct'
require 'rails_helper'
RSpec.describe TimeEntry::Contract::Create do
  describe '#validate' do

    before do
      @model = described_class.new(TimeEntry.new)
    end

    subject { @model.validate(contract) }

    context 'valid contract' do
      let(:contract) {{
        user: User.new,
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
        user: User.new,
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
        user: User.new,
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
        user: User.new,
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

  end
end
