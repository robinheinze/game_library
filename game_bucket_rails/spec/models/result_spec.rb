require 'spec_helper'

describe Result do
  it { should belong_to :game }
  it { should belong_to :search }
end
