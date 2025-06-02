<script>
	import { Link, Card, Box, List, Text } from '$lib/index.js';
  </script>
  
  <Card>
	<Box padding="400">
	  <Text as="h2" variant="headingMd">Quick Links</Text>
	  <List>
		<List.Item>
		  <Link url="/orders">View all orders</Link>
		</List.Item>
		<List.Item>
		  <Link url="/products/new">Add a new product</Link>
		</List.Item>
		<List.Item>
		  <Link url="/customers">Manage customers</Link>
		</List.Item>
		<List.Item>
		  <Link url="/analytics">View analytics</Link>
		</List.Item>
	  </List>
	</Box>
  </Card>