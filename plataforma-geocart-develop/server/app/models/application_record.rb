class ApplicationRecord < ActiveRecord::Base
  attr_accessor :being_manipulated_by_manager
  after_initialize :initialize_instance_variables

  self.abstract_class = true

  scope :group_and_pluck_by, ->(field) { order(field).group(field).pluck(field) }

  def initialize_instance_variables
    @being_manipulated_by_manager = false
  end

  def to_h
    JSON.parse(self.to_json).with_indifferent_access
  end

  def self.truncate
    ActiveRecord::Base.connection.execute("TRUNCATE #{self.table_name} CASCADE")
  end
end
