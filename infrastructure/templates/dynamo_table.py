from troposphere import Parameter, Ref, Output
from troposphere.dynamodb import KeySchema, ProvisionedThroughput, AttributeDefinition
from troposphere.dynamodb import StreamSpecification, Table
from sceptre_template import SceptreTemplate


class SceptreResource(SceptreTemplate):
    def __init__(self, sceptre_user_data):
        super(SceptreResource, self).__init__()
        self.sceptre_user_data = sceptre_user_data
        self.add_parameters()
        self.add_table()

    def add_parameters(self):
        self.table_name = self.template.add_parameter(Parameter(
            "TableName",
            Type="String"
        ))

    def parse_key_schema(self, schema):
        schema_kwargs = {
            "AttributeName": schema.keys()[0],
            "KeyType": schema.values()[0]
        }
        return schema_kwargs

    def add_table(self):
        table_kwargs = {
            "TableName": Ref(self.table_name)
        }
        table_properties = self.sceptre_user_data["TableProperties"]
        # Parse the provided KeySchema
        table_kwargs.update({"KeySchema": []})
        for schema in table_properties.pop("KeySchema"):
            key_schema = KeySchema(**self.parse_key_schema(schema))
            table_kwargs["KeySchema"].append(key_schema)
        # Parse the provisioned throughput
        table_kwargs.update({"ProvisionedThroughput": ProvisionedThroughput(**table_properties["ProvisionedThroughput"])})
        # Parse attribute definitions
        if table_properties.get("AttributeDefinitions"):
            table_kwargs.update({"AttributeDefinitions": []})
            for definition in table_properties.pop("AttributeDefinitions"):
                attribute_kwargs = {
                    "AttributeName": definition.keys()[0],
                    "AttributeType": definition.values()[0]
                }
                attribute_definition = AttributeDefinition(**attribute_kwargs)
                table_kwargs["AttributeDefinitions"].append(attribute_definition)
        # Parse the stream specification
        if table_properties.get("StreamSpecification"):
            table_kwargs.update({"StreamSpecification": StreamSpecification(**table_properties.pop("StreamSpecification"))})
        # Parse the time to live properties
        # if table_properties.get("TimeToLiveSpecification"):
        #     table_kwargs.update({"TimeToLiveSpecification": TimeToLiveSpecification(**table_properties.pop("TimeToLiveSpecification"))})

        # Geez that was a lot of parsing. Y u make so difficult, AWS?
        # Create the table, finally.
        dynamo_table = self.template.add_resource(Table("DynamoTable", **table_kwargs))
        self.template.add_output(Output(
            "DynamoTable",
            Value=Ref(dynamo_table)
        ))


def sceptre_handler(sceptre_user_data):
    """Get template with Cloudformation resources"""
    return SceptreResource(sceptre_user_data).template.to_json()
