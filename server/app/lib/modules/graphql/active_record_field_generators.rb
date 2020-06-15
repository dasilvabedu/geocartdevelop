module Modules
  module Graphql
    module ActiveRecordFieldGenerators
      TYPES = {
        integer: GraphQL::Types::Int,
        string: GraphQL::Types::String,
        text: GraphQL::Types::String,
        decimal: GraphQL::Types::Float,
        date: GraphQL::Types::ISO8601DateTime,
        datetime: GraphQL::Types::ISO8601DateTime,
        boolean: GraphQL::Types::Boolean,
        jsonb: ::Types::JSON,
        json: ::Types::JSON,
      }

      def default_finders_for(
        model_class,
        return_type,
        restrict: false,
        scope: false
      )
        field model_class.model_name.singular, return_type, null: true do
          authenticated if restrict
          argument :id, GraphQL::Types::Int, required: true
        end
        define_method(model_class.model_name.singular.to_sym) do |args|
          model_class.find_by(id: args[:id])
        end

        field "all_#{model_class.model_name.plural}", [return_type], null: false, scope: scope do
          authenticated if restrict
          argument :order, String, required: false
          argument :limit, Integer, required: false
          argument :offset, Integer, required: false
        end
        define_method(
          "all_#{model_class.model_name.plural}".to_sym
        ) do |order: 'id', limit: nil, offset: nil|
          model_class.order(order).all.limit(limit).offset(offset)
        end
      end

      def fields_from_columns_of(model_class)
        enums = model_class.defined_enums.keys
        model_class.columns.each do |column|
          next if column.name =~ /password/

          type = if enums.include?(column.name)
            GraphQL::Types::String
          elsif column.name == 'id'
            GraphQL::Types::Int
          else
            TYPES[column.type]
          end

          field column.name, type, null: column.null
        end
      end
    end
  end
end
